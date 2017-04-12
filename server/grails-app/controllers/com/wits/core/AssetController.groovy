package com.wits.core

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.wits.sec.*;

@Secured('permitAll')
@Transactional(readOnly = true)
class AssetController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Asset.list(params), model:[assetCount: Asset.count()]
    }

    def show(Asset asset) {
        respond asset
    }
 
    def handleFileUpload(MultipartFile file) {
        println " working --- " + params
        try {
            println " 1 " + file.getBytes()
            println " 2 " + file.getOriginalFilename()  
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }      
    }

    @Transactional
    def save(Asset asset) {
        if (asset == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (asset.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond asset.errors, view:'create'
            return
        }

        asset.save flush:true

        respond asset, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Asset asset) {
        if (asset == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (asset.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond asset.errors, view:'edit'
            return
        }

        asset.save flush:true

        respond asset, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Asset asset) {

        if (asset == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        asset.delete flush:true

        render status: NO_CONTENT
    }
}
