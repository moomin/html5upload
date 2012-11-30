function HTML5Upload() {

  var fileList 
  var id
  var dom
  var form
  var filesInput
  var uploadButton

  //Initialization methods
  this.init = function(blockId) {
    id = blockId
    dom = document.getElementById(id)
    form = dom.getElementsByTagName('form')[0]

    //HTML5-way
    filesInput = form.elements.namedItem('files')
    uploadButton = form.elements.namedItem('upload_button')

    filesInput.addEventListener('change', this.updateQueue)
    uploadButton.addEventListener('click', this.startUpload)
  }

  //Real deal
  this.updateQueue = function() {
    fileList = filesInput.files

    for (var f in fileList)
    {
      fileList[f].upload_status = 'pending'
      fileList[f].upload_result = null
    }

    displayStatus()
  }

  this.startUpload = function() {
    alert(this.id + 'start_upload')
  }

  //Display
  var displayStatus = function()
  {
    var uploaded = 0
    var text = ''

    for (var f in fileList)
      if (fileList[f].upload_status == 'finished') uploaded++;

    var statusBlock = dom.getElementsByClassName('upload_status')[0];
    
    if (fileList.length === 0)
      text = 'Please select some files for upload';
    else if (uploaded === 0)
      text = fileList.length + ' files are ready for upload';
    else if (uploaded < fileList.length)
      text = 'Upload in progress; ' + uploaded + '/' + fileList.length + ' uploaded';
    else
      text = 'Upload finished. ' + uploaded + ' files uploaded';

    statusBlock.innerHTML = text;
  }
}
