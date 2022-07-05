<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[
    ORM\Table(name:"app_product"),
    ORM\Entity(repositoryClass:ProductRepository::class)
]
class Product
{

    #[
        ORM\Id,
        ORM\Column(type:"integer"),
        ORM\GeneratedValue()
    ]
    private $id;
    
    #[
        ORM\Column(type:"string", length: 100),
    ]
    private $name;

    #[ORM\Column(type:"string", length: 255, nullable: true)]
    private $image;

    #[ORM\Column(type:"text", length: 65535, nullable: true)]
    private $description;

    #[ORM\Column(type:"integer")]
    private $price;
    
    #[ORM\Column(type: 'datetime'),]
    private $createdAt;

    #[
        ORM\ManyToOne(targetEntity: User::class, inversedBy: 'products'),
        ORM\JoinColumn(nullable: false)
    ]
    private User $user;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }



    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): Product
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): Product
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): Product
    {
        $this->image = $image;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): Product
    {
        $this->price = $price;

        return $this;
    }


    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): Product
    {
        $this->user = $user;

        return $this;
    }
}