package overflow

import com.wits.sec.*

class BootStrap {

     def init = { servletContext ->

      def adminRole = new Role(authority: 'ROLE_ADMIN').save() 
      def userRole = new Role(authority: 'ROLE_USER').save() 

      def testUser = new User(username: 'admin', password: 'admin').save()

      UserRole.create testUser, adminRole

      UserRole.withSession {
         it.flush()
         it.clear()
      }

      assert User.count() == 1
      assert Role.count() == 2
      assert UserRole.count() == 1
    }
    def destroy = {
    }
}

