-- CreateTable
CREATE TABLE "confessions" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(500),
    "message_type" VARCHAR(50),
    "recipient" INTEGER,
    "sender" INTEGER,

    CONSTRAINT "confessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(13) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50),
    "anonymous" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "confessions" ADD CONSTRAINT "fk_recipient" FOREIGN KEY ("recipient") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "confessions" ADD CONSTRAINT "fk_sender" FOREIGN KEY ("sender") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
