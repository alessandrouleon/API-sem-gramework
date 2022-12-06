/*================================================================================*/
/* CREATE TABLES                                                                  */
/*================================================================================*/

CREATE TABLE USERS (
  ID VARCHAR(64) NOT NULL,
  NAME VARCHAR(64) NOT NULL,
  USERNAME VARCHAR(64) NOT NULL,
  EMAIL VARCHAR(64) NOT NULL,
  CONSTRAINT PK_USER PRIMARY KEY (ID)
);

ALTER TABLE USERS 
ADD COLUMN PASSWORD VARCHAR(64) CHECK(LENGTH(PASSWORD) >= 8);

ALTER TABLE USERS 
ALTER COLUMN PASSWORD TYPE VARCHAR(256);


