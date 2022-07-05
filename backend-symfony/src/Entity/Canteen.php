<?php

namespace App\Entity;

use App\Repository\CanteenRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CanteenRepository::class)]
class Canteen
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;
    

    #[ORM\Column(type: 'integer')]
    private $balance;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBalance(): int
    {
        return $this->balance;
    }

    public function setBalance(int $balance): Canteen
    {
        $this->balance = $balance;

        return $this;
    }



}
