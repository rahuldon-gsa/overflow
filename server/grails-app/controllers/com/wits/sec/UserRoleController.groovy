package com.wits.sec

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured 

@Secured('ROLE_ADMIN')
@Transactional(readOnly = true)
class UserRoleController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond UserRole.list(params), model:[userRoleCount: UserRole.count()]
    }

    def show(UserRole userRole) {
        respond userRole
    }

    @Transactional
    def save(UserRole userRole) {
        if (userRole == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (userRole.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond userRole.errors, view:'create'
            return
        }

        userRole.save flush:true

        respond userRole, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(UserRole userRole) {
        if (userRole == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (userRole.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond userRole.errors, view:'edit'
            return
        }

        userRole.save flush:true

        respond userRole, [status: OK, view:"show"]
    }

    @Transactional
    def delete(UserRole userRole) {

        if (userRole == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        userRole.delete flush:true

        render status: NO_CONTENT
    }
}
