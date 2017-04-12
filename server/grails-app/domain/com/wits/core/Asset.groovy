package com.wits.core

class Asset {

 byte[] imageFile

    static constraints = {
        // Limit upload file size to 2MB
        imageFile maxSize: 1024 * 1024 * 2
    }
}
