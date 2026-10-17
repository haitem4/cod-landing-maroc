/**
 * ============================================================================
 * SCRIPT GOOGLE APPS SCRIPT POUR VOS COMMANDES COD MAROC (Confort Pro)
 * ============================================================================
 * Ce script :
 * 1. Reçoit automatiquement chaque commande soumise depuis votre landing page
 * 2. L'ajoute sur une nouvelle ligne dans votre Google Sheet
 * 3. Applique automatiquement une liste déroulante sur la colonne "Statut"
 * 4. Met en couleur automatique chaque statut (Nouveau, Confirmé, Livré, Annulé...)
 * 
 * INSTRUCTIONS D'INSTALLATION (1 minute) :
 * -------------------------------------------------------------
 * 1. Allez sur https://sheets.new pour créer un nouveau Google Sheet
 * 2. Renommez-le par exemple : "Commandes - Confort Pro Maroc"
 * 3. Dans le menu, cliquez sur : Extensions > Apps Script
 * 4. Effacez tout le code existant et collez TOUT ce fichier ci-dessous
 * 5. Cliquez sur l'icône "Enregistrer" (la disquette)
 * 6. Exécutez une première fois la fonction "initialiserFeuille" en cliquant sur "Exécuter"
 *    (Google vous demandera d'autoriser l'accès, acceptez)
 * 7. Cliquez en haut à droite sur le bouton bleu "Déployer" > "Nouveau déploiement"
 * 8. Sélectionnez le type : "Application Web" (roue crantée)
 *    - Description : "API Commandes COD"
 *    - Exécuter en tant que : "Moi"
 *    - Qui a accès : "Tout le monde" (IMPORTANT pour que le site puisse envoyer)
 * 9. Cliquez sur "Déployer" et copiez l'URL de l'application Web
 *    (qui ressemble à : https://script.google.com/macros/s/AKfycb.../exec)
 * 10. Donnez-moi cette URL ou collez-la dans lib/googleSheet.ts !
 * ============================================================================
 */

// Liste des statuts avec leurs couleurs (Fond, Texte)
const STATUS_OPTIONS = [
  { label: "🟡 Nouveau", bg: "#FEF08A", text: "#713F12" },
  { label: "📞 Contacté", bg: "#FFEDD5", text: "#9A3412" },
  { label: "🔵 Confirmé", bg: "#DBEAFE", text: "#1E40AF" },
  { label: "🚚 En cours d'expédition", bg: "#E0E7FF", text: "#3730A3" },
  { label: "🟢 Livré / Payé", bg: "#DCFCE7", text: "#14532D" },
  { label: "🔴 Annulé", bg: "#FEE2E2", text: "#7F1D1D" },
  { label: "🔁 Retour", bg: "#E2E8F0", text: "#334155" },
];

/**
 * Fonction d'initialisation : configure les en-têtes, les listes déroulantes et les couleurs
 */
function initialiserFeuille() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Commandes");
  
  if (!sheet) {
    sheet = ss.insertSheet("Commandes");
    const defaultSheet = ss.getSheetByName("Feuille 1") || ss.getSheetByName("Sheet1");
    if (defaultSheet && ss.getSheets().length > 1) {
      ss.deleteSheet(defaultSheet);
    }
  }

  // En-têtes des colonnes
  const headers = [
    "ID Commande",
    "Date & Heure",
    "Nom du Client",
    "Téléphone",
    "Ville",
    "Adresse Complète",
    "Offre / Pack",
    "Couleur",
    "Pointure",
    "Quantité",
    "Prix Total",
    "Statut",
    "Notes & Suivi"
  ];

  // Insérer et styliser les en-têtes
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground("#0F172A"); // Slate 900 foncé élégant
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Calibri");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);

  // Figer la première ligne
  sheet.setFrozenRows(1);

  // Largeurs des colonnes optimales
  const widths = [140, 140, 180, 140, 130, 260, 180, 100, 100, 80, 110, 190, 200];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Configuration de la liste déroulante sur toute la colonne Statut (colonne 12 = L)
  const statusColumn = 12;
  const statusRange = sheet.getRange(2, statusColumn, 999, 1);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS.map(s => s.label), true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);

  // Configuration des règles de mise en forme conditionnelle par couleur
  const rules = [];
  STATUS_OPTIONS.forEach(opt => {
    const cRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(opt.label)
      .setBackground(opt.bg)
      .setFontColor(opt.text)
      .setBold(true)
      .setRanges([sheet.getRange(2, statusColumn, 999, 1)])
      .build();
    rules.push(cRule);
  });
  sheet.setConditionalFormatRules(rules);

  Logger.log("Feuille initialisée avec succès avec listes déroulantes et couleurs !");
}

/**
 * Réception des commandes depuis le site web (requête HTTP POST)
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Commandes");
    
    if (!sheet) {
      initialiserFeuille();
      sheet = ss.getSheetByName("Commandes");
    }

    // Récupération des données envoyées en JSON
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    const nextRow = sheet.getLastRow() + 1;

    // Préparation de la ligne
    const rowValues = [
      data.orderId || "CFP-" + Utilities.formatDate(new Date(), "Africa/Casablanca", "yyyyMMdd-HHmm"),
      data.date || Utilities.formatDate(new Date(), "Africa/Casablanca", "dd/MM/yyyy HH:mm"),
      data.customerName || "",
      "'" + (data.phone || ""), // Le guillemet force le format texte pour ne pas perdre le 0 de 06...
      data.city || "",
      data.address || "",
      data.pack || "",
      data.color || "",
      data.size || "",
      data.qty || 1,
      data.total || "",
      data.status || "🟡 Nouveau",
      "" // Notes
    ];

    const rowRange = sheet.getRange(nextRow, 1, 1, rowValues.length);
    rowRange.setValues([rowValues]);
    rowRange.setFontFamily("Calibri");
    rowRange.setFontSize(10);
    rowRange.setVerticalAlignment("middle");
    sheet.setRowHeight(nextRow, 32);

    // Centrer les colonnes clés (ID, Date, Tél, Ville, Qté, Prix, Statut)
    sheet.getRange(nextRow, 1).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 2).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 4).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 5).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 8).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 9).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 10).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 11).setHorizontalAlignment("center");
    sheet.getRange(nextRow, 12).setHorizontalAlignment("center");

    // Réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", row: nextRow, orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Erreur doPost: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Endpoint GET pour tester que la Web App est bien en ligne
 */
function doGet(e) {
  return ContentService
    .createTextOutput("Le Webhook Google Sheets pour Confort Pro Maroc fonctionne parfaitement !")
    .setMimeType(ContentService.MimeType.TEXT);
}
