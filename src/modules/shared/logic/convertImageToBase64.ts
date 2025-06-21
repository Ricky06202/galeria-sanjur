export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    // Asegurarse de que el archivo es una instancia de File
    if (!(file instanceof File)) {
      reject(new Error('El argumento proporcionado no es un objeto File válido.'));
      return;
    }

    const reader = new FileReader();

    // Cuando el lector haya terminado de cargar el archivo
    reader.onload = () => {
      resolve(reader.result); // reader.result contendrá la cadena Base64 (data URL)
    };

    // Si ocurre un error durante la lectura del archivo
    reader.onerror = (error) => {
      reject(error);
    };

    // Leer el contenido del archivo como una URL de datos (Base64)
    reader.readAsDataURL(file);
  });
};

// Función para convertir una cadena Base64 a un objeto File
// Requiere la cadena Base64, el nombre de archivo y el tipo MIME original
export const base64ToFile = (base64String: string, filename: string, mimeType: string = 'image/jpeg') => {
  // Extraer la parte de datos de la cadena Base64 (después de "data:image/png;base64,")
  // Si la cadena Base64 no contiene el prefijo, asumimos que es solo la parte de datos.
  const base64Data = base64String.includes(',') ? base64String.split(',')[1] : base64String;

  // Decodificar la cadena Base64 a una cadena binaria
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  // Convertir la cadena binaria a un ArrayBuffer
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Crear un Blob a partir del ArrayBuffer
  const blob = new Blob([byteArray], { type: mimeType });

  // Crear y retornar un nuevo objeto File
  return new File([blob], filename, { type: mimeType });
};