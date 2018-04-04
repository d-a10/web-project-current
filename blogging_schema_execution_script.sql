-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema blogging_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blogging_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blogging_schema` DEFAULT CHARACTER SET utf8 ;
USE `blogging_schema` ;

-- -----------------------------------------------------
-- Table `blogging_schema`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogging_schema`.`Users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `handle` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dob` DATE NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `handle_UNIQUE` (`handle` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogging_schema`.`Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogging_schema`.`Posts` (
  `post_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `body` TEXT NULL,
  `author_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT  CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  INDEX `user_id_idx` (`author_id` ASC),
  CONSTRAINT `user_id`
    FOREIGN KEY (`author_id`)
    REFERENCES `blogging_schema`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogging_schema`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogging_schema`.`Comments` (
  `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_id` INT UNSIGNED NOT NULL,
  `body` TEXT(5000) NULL,
  `created_at` TIMESTAMP NULL DEFAULT  CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `post_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `author_idx` (`author_id` ASC),
  INDEX `post_idx` (`post_id` ASC),
  CONSTRAINT `author`
    FOREIGN KEY (`author_id`)
    REFERENCES `blogging_schema`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `post`
    FOREIGN KEY (`post_id`)
    REFERENCES `blogging_schema`.`Posts` (`post_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- This adds some entry posts (which are necessary to populate the feed)
-- Additionally you can create posts by making a post request to /posts
-- Posts do require an existing user


INSERT INTO users (email, password, first_name, last_name, handle, dob) 
VALUES ('firstuser@gmail.com','$2a$10$9VYx.Eo8rvTG/RQVcS5nj.knmDsM.80JToW03PIjYnH2GIooNltMi' 
, 'john', 'doe', 'john', null);

INSERT INTO posts (author_id, body, title) 
VALUES('1', 'Lorem Ipsum is simply dummy text  of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'First Post');

INSERT INTO posts (author_id, body, title) 
VALUES('1', 'second', 'second Post');

INSERT INTO posts (author_id, body, title) 
VALUES('1', 'third', 'third Post');

INSERT INTO posts (author_id, body, title) 
VALUES('1', 'fourth', 'fourth Post');

INSERT INTO posts (author_id, body, title) 
VALUES('1', 'fifth', 'fifth Post');

