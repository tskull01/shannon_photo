import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folder } from './folder';
import { TransferStateService } from '@scullyio/ng-lib';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FolderBuilderService {

  holder:any;
  allFolders:Folder[] = [];
  folderNum:number;
  folderSubject:BehaviorSubject<Folder[]> = new BehaviorSubject((this.allFolders));  
  
  constructor(private http:HttpClient, private transferStateService:TransferStateService) { }
async numberOfFolders(){
  return this.transferStateService.useScullyTransferState('size', this.http.get('.netlify/functions/filesize')).toPromise().catch((reason) => {console.log(reason)});
}
async folderCall(){
  return this.transferStateService.useScullyTransferState('folders',this.http.get('.netlify/functions/getfolders')).toPromise().catch((reason) => {console.log(reason)});
     }
async folders(){
  console.log('calling folders')
  let num =<string[]> await this.numberOfFolders();
 this.folderNum = num.length; 
  let data = await this.folderCall();
    //Data comes back as data['data'][firstElement] or data['data'][0] 
    //properties are also numbered data['data'][0][firstProperty] or data['data'][0][0]
      for(let i = 0;i < this.folderNum; i++){
        this.allFolders.push(new Folder(data['data'][i][0],data['data'][i][1],data['data'][i][2],data['data'][i][3],data['data'][i][4]))
      }
     this.folderSubject.next(this.allFolders);
  }
  /*listSiteAssets(){
    this.http.get('.netlify/git/github/').subscribe((response) => {
      return response; 
    })
  }*/

  testCall(){
    this.http.get('https://api.netlify.com/api/v1/sites/b17a518e-5364-4a04-8c5d-3f272721a2d9/assets').subscribe((result) =>{
      console.log(result)
    })
  }
}
