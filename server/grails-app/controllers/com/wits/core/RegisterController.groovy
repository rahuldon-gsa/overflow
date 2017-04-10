package com.wits.core

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured
import com.wits.sec.*;

@Secured('permitAll')
@Transactional(readOnly = true)
class RegisterController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Register.list(params), model:[registerCount: Register.count()]
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
