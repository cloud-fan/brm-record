package models

import play.api.db.DB
import play.api.Play.current
import anorm._
import anorm.SqlParser._

/**
 * Created by cloud on 12/9/13.
 */
case class Player(id: Int, name: String, email: Option[String], weiquan: Int, isAdmin: Boolean)

object Player {

  val simple = {
    int("id") ~
    str("name") ~
    str("email").? ~
    int("weiquan") ~
    bool("isAdmin") map {
      case id~name~email~weiquan~isAdmin => Player(id, name, email, weiquan, isAdmin)
    }
  }

  def getAllPlayers = {
    DB.withConnection { implicit connection =>
      SQL("select * from players").as(simple *)
    }
  }
}

