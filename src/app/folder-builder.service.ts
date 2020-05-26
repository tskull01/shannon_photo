import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folder } from './folder';
@Injectable({
  providedIn: 'root'
})
export class FolderBuilderService {

  holder:any;
  allFolders:Folder[] = [];
  folderNum:number; 
  
  constructor(private http:HttpClient) { }
addNewFolder(folder:Folder){
this.http.put
}
numberOfFolders(){
  this.http.get('.netlify/functions/filesize').subscribe((data) => {
    this.folderNum = data['data'].length
  })
}

async getFolders(){
 let result = await this.folders();
return result; 
}
async returnAllFolders(){
  if(this.allFolders){
    return this.allFolders;
  }else{
    return await this.folders();
  }
}
async folders(){
  this.numberOfFolders();
  let data = await this.http.get('.netlify/functions/getfolders').toPromise();
    //Data comes back as data['data'][firstElement] or data['data'][0] 
    //properties are also numbered data['data'][0][firstProperty] or data['data'][0][0]
    console.log(data);
   for(let i = 0;i < this.folderNum; i++){
       this.allFolders.push(new Folder(data['data'][i][0],data['data'][i][1],data['data'][i][2],data['data'][i][3],data['data'][i][4]))
     if(this.allFolders.length === this.folderNum){
       console.log('resolving')
         return this.allFolders;
      }
     }
   }
}
