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
      SQL("select id,name,email,weiquan,isAdmin from players").as(simple *)
    }
  }

  def getAvatarByPlayerName(name: String) = {
    DB.withConnection { implicit connection =>
      SQL("select avatar from players where name = {name}")
      .on('name -> name)
      .as(str("avatar").singleOpt)
      .getOrElse("default.jpg")
    }
  }

  def getPlayerById(id: Int) = {
    DB.withConnection { implicit connection =>
      SQL("select id,name,email,weiquan,isAdmin from players where id = {id}")
      .on('id -> id)
      .as(simple.singleOpt)
    }
  }

  def authenticate(name: String, password: String) = {
    DB.withConnection { implicit connection =>
      SQL(
        """
          select id,name,email,weiquan,isAdmin from players
          where name = {name} and password = {password}
        """
      ).on(
          'name -> name,
          'password -> password
      ).as(simple.singleOpt)
    }
  }
}

