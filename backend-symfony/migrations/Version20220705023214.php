<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220705023214 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE canteen (id INT AUTO_INCREMENT NOT NULL, balance INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE app_product RENAME INDEX idx_5a0eb6a0a76ed395 TO IDX_3E1784E0A76ED395');
        $this->addSql('INSERT INTO canteen VALUES (1, 0)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE canteen');
        $this->addSql('ALTER TABLE app_product RENAME INDEX idx_3e1784e0a76ed395 TO IDX_5A0EB6A0A76ED395');
    }
}
