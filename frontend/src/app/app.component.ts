import { Component, Sanitizer, OnDestroy } from '@angular/core'
import uniqueID from 'lodash.uniqueid'
import filesize from 'filesize'
import { DomSanitizer } from '@angular/platform-browser'
import api from './services/api'
import { async } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  

  uploadedFiles: any[] = []

  constructor(private sanitization:DomSanitizer){}
  
  async ngOnInit() {

    const events = ['dragover', 'drop']
    for (let i = 0; i < events.length; i++) {
      window.addEventListener(events[i], 
        (e)=>{
            e.preventDefault();
        }, 
        false)
    }

    const response = await api.get('/posts');
    
    this.uploadedFiles = response.data.map(file => ({
      id: file._id,
      name: file.name,
      readableSize: file.size,
      preview: this.sanitization.bypassSecurityTrustStyle(`url(${file.url})`),
      uploaded: true,
      url: file.url
    }))

  }

  handleUpload = (files:File[])=>{
    const uploadedFiles = files.map(file =>({
      file,
      id: uniqueID(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: this.sanitization.bypassSecurityTrustStyle(`url(${URL.createObjectURL(file)})`),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    this.uploadedFiles.push(...uploadedFiles)

    uploadedFiles.forEach(this.processUpload)
  }

  updateFile = (id, data) => {

    for(let i=0; i < this.uploadedFiles.length; i++){
      if(id == this.uploadedFiles[i].id){
        Object.assign(this.uploadedFiles[i], data)
      }
    }
  }

  processUpload = (uploadedFile) => {
    const data = new FormData()

    data.append('file', uploadedFile.file, uploadedFile.name)

    api.post('/posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total).toString())

        this.updateFile(uploadedFile.id, {
          progress
        })
      }
    }).then(response =>{
      this.updateFile(uploadedFile.id, {
        uploaded:true,
        id: response.data._id,
        url: response.data.url
      })
    }).catch(error =>{
      this.updateFile(uploadedFile.id, {
        error:true
      })
    })
  }

  handleDelete = async id => {
    await api.delete(`/posts/${id}`)

    this.uploadedFiles = this.uploadedFiles.filter(file=> file.id != id)
  }

  ngOnDestroy(): void {
    this.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
  }
}
