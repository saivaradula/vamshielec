import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
declare const $: any;
@Component({
    selector: 'add-logo',
    templateUrl: "./add.logo.component.html",
    styleUrls: ["./add.logo.component.scss"]
})


export class AddLogoDialogComponent implements OnInit {
    imageChangedEvent: any = '';
    croppedImage: any = null;
    size: any;
    event: any;
    constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddLogoDialogComponent>) {

    }
    ngOnInit() {
        //event.preventDefault();
        // let element: HTMLElement = document.getElementById('browse') as HTMLElement;
        // element.click();

        $("image-cropper").css('display', 'block');
        this.imageChangedEvent = event;
        var image: any = new Image();
        var file: File = this.imageChangedEvent.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        let image_arr = [];
        let image_new = [];
        if (file == undefined || file.size == 0) {
            console.log("Image undefined got or zero size:");
            this.dialogRef.close();
        } else {
            this.size = file.size / 1024;
            if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
            } else {
                this.croppedImage = null;
                this.openSnackBar("Failed to upload image the format is not supported", "");
                this.dialogRef.close("cancel");
            }
            
            if (this.size > 2000) {
                this.croppedImage = null;
                this.openSnackBar("Image uploads are limited to 2MB. Please use a smaller image", "");
                this.dialogRef.close("cancel");

            }
        }

    }
    fileChangeEvent(event: any): void {
        $("image-cropper").css('display', 'block');
        this.imageChangedEvent = event;
        var image: any = new Image();
        var file: File = this.imageChangedEvent.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        let image_arr = [];
        let image_new = [];
        this.size = file.size / 1024;
        if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
        } else {
            this.croppedImage = null;
            this.openSnackBar("Failed to upload image the format is not supported", "");
            this.dialogRef.close("cancel");

        }
        if (this.size > 2000) {
            this.croppedImage = null;
            this.openSnackBar("Image uploads are limited to 2MB. Please use a smaller image", "");
            this.dialogRef.close("cancel");

        }

    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        if (this.size > 2000) {
            this.croppedImage = null;
            event.base64 = '';
            this.openSnackBar("Image uploads are limited to 2MB. Please use a smaller image", "");
            this.dialogRef.close("cancel");
            return false;
        }
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        if (this.size > 2000) {
            this.croppedImage = null;
            $(".source-image.ng-star-inserted").attr('src', '');
            $("image-cropper").css('display', 'none');
            console.log("Cropper ready Image string got" + this.croppedImage + " Event");
        }
    }
    loadImageFailed() {
        // show message
    }
    saveProfileLogo() {
        if (this.croppedImage == null || this.croppedImage == undefined) {
            this.openSnackBar('Please upload logo.', '');
            this.dialogRef.close("cancel");
            return false;
        } else {
            this.dialogRef.close("save");
        }

    }

    closeProfileDialog() {
        this.dialogRef.close("cancel");
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}