package com.wits.sec

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 

@Secured('ROLE_ADMIN')
@Transactional(readOnly = true)
class RoleController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Role.list(params), model:[roleCount: Role.count()]
    }

    def show(Role role) {
        respond role
    }

    @Transactional
    def save(Role role) {
        if (role == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (role.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond role.errors, view:'create'
            return
        }

        role.save flush:true

        respond role, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Role role) {
        if (role == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (role.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond role.errors, view:'edit'
            return
        }

        role.save flush:true

        respond role, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Role role) {

        if (role == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        role.delete flush:true

        render status: NO_CONTENT
    }
}
