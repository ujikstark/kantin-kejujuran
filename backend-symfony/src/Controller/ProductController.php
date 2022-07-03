<?php

namespace App\Controller;



use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{

    public function __construct(
        private ProductRepository $userRepository
    ) {   
    }

    #[Route('/api/products', name: 'products_list', methods: [Request::METHOD_GET])]
    public function indexAction()
    {
        $products = $this->userRepository->findAll();
        
        return $this->json($products);
    }

    #[Route('/api/products', name: 'create_product', methods: [Request::METHOD_GET])]
    public function createAction()
    {
        $response = $this->json(null,Response::HTTP_NO_CONTENT);
        
        return $response;
    }
}