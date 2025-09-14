<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250911195707 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Convert existing TIME data to integer (hour)
        $this->addSql('UPDATE exam SET time = HOUR(time) WHERE time IS NOT NULL');
        
        // Change column type from TIME to INT
        $this->addSql('ALTER TABLE exam CHANGE time time INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exam CHANGE time time TIME NOT NULL');
    }
}
