// Use the file input only as a file picker.
// fileInput.files will only be used to refer to the files that are currently picked.
const fileInput = document.querySelector(".file-input");

// This button will delegate its click to the native file input element (The native file input will be hidden).
// This is because it's hard to style the native file input element.
const uploadButton = document.querySelector(".pick-file-button");
uploadButton.onclick = () => fileInput.click();

// This container will show all the files that have been picked or dropped so far.
let uploadedFiles = [];
const uploadedFilesContainer = document.querySelector(
  ".uploaded-files-container"
);

// This is needed to assign a unique id to each file that has been uploaded.
let fileId = 0;

// Add the files that were just picked to the uploaded files container when a new set of files is picked.
fileInput.onchange = () => {
  addUploadedFiles(fileInput.files);
  // For demonstration purposes, we will ensure that this event is called even if the user
  // selects the same files.
  // the fileInput.files fileList is immutable, despite that, it is re-assignable.
  // We can abuse the DataTransfer API to obtain an empty file list.
  fileInput.files = new DataTransfer().files;
};

// Add the files that were dropped into the drop zone via drag and drop.
const dropZone = document.querySelector(".drop-zone");
// Prevent the file from being opened in the browser.
dropZone.ondragover = (event) => event.preventDefault();
dropZone.ondrop = (event) => {
  // Prevent the file from being opened in the browser.
  event.preventDefault();

  addUploadedFiles(event.dataTransfer.files);
};

// Add files to the uploadedFiles Array and refresh uploadedFilesContainer.
function addUploadedFiles(fileList) {
  for (let i = 0; i < fileList.length; i++) {
    // An id property is added to each file before its pushed to the uploadedFilesArray.
    // The fileId variable is also incremented.
    uploadedFiles.push({ value: fileList[i], id: fileId++ });
  }
  refreshUploadedFilesContainer();
}

// Remove a file from the uploadedFiles Array and refresh uploadedFilesContainer.
function removeUploadedFile(id) {
  uploadedFiles = uploadedFiles.filter(
    (uploadedFile) => uploadedFile.id !== id
  );
  refreshUploadedFilesContainer();
}

// Empty the uploaded files container then fill again with the uploadedFiles array contents.
refreshUploadedFilesContainer = () => {
  uploadedFilesContainer.innerHTML = "";
  uploadedFiles.forEach((uploadedFile) => {
    const li = document.createElement("li");
    li.textContent = `id: ${uploadedFile.id} | name: ${uploadedFile.value.name}`;
    li.onclick = () => {
      removeUploadedFile(uploadedFile.id);
    };
    uploadedFilesContainer.appendChild(li);
  });
};
