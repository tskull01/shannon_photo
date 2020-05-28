import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folder } from './folder';
import { TransferStateService } from '@scullyio/ng-lib';
@Injectable({
  providedIn: 'root'
})
export class FolderBuilderService {

  holder:any;
  allFolders:Folder[] = [];
  folderNum:number;
  
  constructor(private http:HttpClient, private transferStateService:TransferStateService) { }
async numberOfFolders(){
  return this.transferStateService.useScullyTransferState('size', this.http.get('.netlify/functions/filesize')).toPromise();
}
async returnAllFolders(){
  if(this.allFolders.length > 1){
    return this.allFolders;
  }else{
    this.allFolders =<Folder[]> await this.folders();
    console.log(this.allFolders)
    return this.allFolders
  }
}
async folders(){
  let num =<string[]> await this.numberOfFolders();
 this.folderNum = num.length; 
  let data = await this.folderCall();
    //Data comes back as data['data'][firstElement] or data['data'][0] 
    //properties are also numbered data['data'][0][firstProperty] or data['data'][0][0]
      for(let i = 0;i < this.folderNum; i++){
        this.allFolders.push(new Folder(data['data'][i][0],data['data'][i][1],data['data'][i][2],data['data'][i][3],data['data'][i][4]))
      }
      return this.allFolders;
  }
 async folderCall(){
return this.transferStateService.useScullyTransferState('folders',this.http.get('.netlify/functions/getfolders')).toPromise();
   }
}
