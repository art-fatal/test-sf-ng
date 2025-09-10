<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ExamRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ExamRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post()
    ]
)]
class Exam
{
    public const string STATE_CONFIRMED = 'Confirmed';
    public const string STATE_WAITING_PLACE = 'WaitingPlace';
    public const string STATE_CANCELED = 'Canceled';
    public const string STATE_TO_ORGANIZE = 'ToOrganize';
    public const array STATES = [
        self::STATE_CONFIRMED,
        self::STATE_WAITING_PLACE,
        self::STATE_CANCELED,
        self::STATE_TO_ORGANIZE,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Please enter the student name')]
    private ?string $studentName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $location = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Assert\NotBlank(message: 'Please enter the time')]
    #[Assert\Time(message: 'Please enter a valid time')]
    private ?\DateTime $time = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Please enter the status')]
    #[Assert\Choice(choices: self::STATES, message: 'Please enter a valid status')]
    private ?string $status = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Assert\NotBlank(message: 'Please enter the date')]
    #[Assert\Date(message: 'Please enter a valid date')]
    private ?\DateTime $date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStudentName(): ?string
    {
        return $this->studentName;
    }

    public function setStudentName(string $studentName): static
    {
        $this->studentName = $studentName;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getTime(): ?\DateTime
    {
        return $this->time;
    }

    public function setTime(\DateTime $time): static
    {
        $this->time = $time;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): static
    {
        $this->date = $date;

        return $this;
    }
}
