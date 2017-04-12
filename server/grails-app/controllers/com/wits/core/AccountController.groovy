package com.wits.core

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.plugin.springsecurity.annotation.Secured

@Secured('permitAll')
@Transactional(readOnly = true)
class AccountController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Account.list(params), model:[accountCount: Account.count()]
    }

    def show(Account account) {
        respond account
    }

    @Transactional
    def save(Account account) {

        if (account == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (account.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond account.errors, view:'create'
            return
        }
        account.num = account.state + account.num
        account.save flush:true

        respond account, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Account account) {
        if (account == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (account.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond account.errors, view:'edit'
            return
        }

        account.save flush:true

        respond account, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Account account) {

        if (account == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        account.delete flush:true

        render status: NO_CONTENT
    }
}
