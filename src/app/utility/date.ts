export function getFormattedDate(offset = 0) {
    // Crea una nuova data e applica l'offset
    let today = new Date();
    today.setDate(today.getDate() + offset);
  
    // Estrae il giorno, mese e anno dalla data corrente
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0
    let year = today.getFullYear();
  
    // Combina i valori nel formato desiderato
    let formattedDate = day + '-' + month + '-' + year;
  
    return formattedDate;
  }
  
  