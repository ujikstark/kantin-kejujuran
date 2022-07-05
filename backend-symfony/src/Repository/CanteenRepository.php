<?php

namespace App\Repository;

use App\Entity\Canteen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Canteen>
 *
 * @method Canteen|null find($id, $lockMode = null, $lockVersion = null)
 * @method Canteen|null findOneBy(array $criteria, array $orderBy = null)
 * @method Canteen[]    findAll()
 * @method Canteen[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CanteenRepository extends ServiceEntityRepository
{
    use EntityManagerTrait;


    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Canteen::class);
    }


}
