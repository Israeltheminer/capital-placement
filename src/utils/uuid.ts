function generateUUID(): string {
   let uuid = '';
   const characters = 'abcdef0123456789';
   const segments = [8, 4, 4, 4, 12];

   for (let i = 0; i < segments.length; i++) {
      for (let j = 0; j < segments[i]; j++) {
         uuid += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      if (i < segments.length - 1) {
         uuid += '-';
      }
   }

   return uuid;
}

export default generateUUID;
