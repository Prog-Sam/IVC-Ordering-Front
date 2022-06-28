import http from './httpService';

// export async function getFiles() {
//   const files = await http.get(`/fileDetails`);
//   // console.log(result);
//   return files;
// }

// export async function getFile(id) {
//   const file = await http.get(`/fileDetails/${id}`);
//   // console.log(result);
//   return file;
// }

export async function saveFile(file) {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    let fileInDb = await http.post(`/uploadFile`, file, config);
    return fileInDb;
  } catch (ex) {
    console.log(ex);
  }
}

// export async function updateFile(file) {
//   let localFile = { ...file };
//   delete localFile['id'];

//   let fileInDb = await http.put(`/fileDetails/${file.id}`, localFile);
//   return fileInDb;
// }
