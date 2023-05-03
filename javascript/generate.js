const descriptionDto = {
  groupId: '',
  artifactId: '',
  build: '',
  name: '',
  description: '',
  packageName: '',
  packageType: '',
  language: '',
  languageVersion: '',
  springBootVersion: '',
  dependencies: []
};

function collectData() {

  document.querySelectorAll('.js-input-project').forEach((input, index) => {

    switch (index) {
      case 0:
        descriptionDto.groupId = input.value;
        break;
      case 1:
        descriptionDto.artifactId = input.value;
        break;
      case 2:
        descriptionDto.name = input.value;
        break;
      case 3:
        descriptionDto.build = input.value;
        break;
      case 4:
        descriptionDto.description = input.value;
        break;
      case 5:
        descriptionDto.packageName = input.value;
        break;
      case 6:
        descriptionDto.packageType = input.value;
        break;
      case 7:
        descriptionDto.language = input.value;
        break;
      case 8:
        descriptionDto.languageVersion = input.value;
        break;
      case 9:
        descriptionDto.springBootVersion = input.value;
        break;
      case 10:
        input.value.split(",").forEach((element, index) => {
          descriptionDto.dependencies[index] = element;
        });
    }
  });
  return descriptionDto;
}


sync function postFileDownload(data) {

  try {
    const response = await fetch("http://localhost:8080/InitializrController/createProject", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response) throw Error('data not found');

    const result = await response.arrayBuffer();

    console.log("Success:", result);

    return result;
a
  } catch (Error) {
    console.error('ERROR:' ,Error);
  }

}

async function download() {

  try {

    const data = collectData();

    /*const data = descriptionDto;*/

    const result = await postFileDownload(data);

    if (result.byteLength < 140) throw Error('result is empty');

    console.log(result);

    const blob = new Blob([result]);

    const fileName = `${data.name}.zip`;

    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (Error) {
    console.error('ERROR:', Error);
    return;

  }
}









