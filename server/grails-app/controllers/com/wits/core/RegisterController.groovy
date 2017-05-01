package com.wits.core

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.wits.sec.*;
import org.springframework.beans.BeanWrapper
import org.springframework.beans.PropertyAccessorFactory


@Secured('permitAll')
class RegisterController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", resetPassword: "POST"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Register.list(params), model:[registerCount: Register.count()]
    }

    @Transactional
    def findUser(String username) {
        def dbuser = User.findByUsername(username)
        if (dbuser == null) {
            render status: NOT_FOUND
            return
        }
        dbuser.password = 'World@24'
        dbuser.save()
        respond status: OK
    }

    def findUserName(String firstName, String lastName, String mobile) {
        def register = Register.findByFirstNameAndLastNameAndMobile(firstName, lastName, mobile)
         if (register == null) {
            render status: NOT_FOUND
            return
        }
        respond register
    }

    def show(Register register) {
        respond register
    }
 
    @Transactional
    def save(Register register) {
        if (register == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (register.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond register.errors, view:'create'
            return
        }

        register.save flush:true

        def registerUser = new User(username: register.email, password: register.password).save(flush:true)
        UserRole.create registerUser, Role.findByAuthority("ROLE_USER"), true

        respond register, [status: CREATED, view:"show"]
    }
    
    @Transactional
    def resetPassword(String username) {

        if (!username) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        def reet = User.findByUsername(username)
        if (reet == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        def resetUser = new User(username: username, password: 'World@24').save()
        respond status: OK
    }

    @Transactional
    def update(Register register) {
        if (register == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (register.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond register.errors, view:'edit'
            return
        }

        register.save flush:true

        respond register, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Register register) {

        if (register == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        register.delete flush:true

        render status: NO_CONTENT
    }
}
