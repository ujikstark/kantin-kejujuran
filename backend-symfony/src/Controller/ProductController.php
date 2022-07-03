<?php

namespace App\Controller;



use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProductController extends AbstractController
{

    public function __construct(
        private ProductRepository $productRepository,
    ) {   
    }

    #[Route('/api/products', name: 'products_list', methods: [Request::METHOD_GET])]
    public function indexAction()
    {
        $products = $this->productRepository->findAll();
        
        return $this->json($products);
    }

    #[Route('/api/products', name: 'create_product', methods: [Request::METHOD_POST])]
    public function createAction(Request $request)
    {
        $input = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($input['name']);
        $product->setDescription($input['description']);
        $product->setImage($input['image']);
        $product->setPrice((int)$input['price']);

        $this->productRepository->save($product);

        return $this->json('created!');
        
    }

    #[Route('/api/product/{id}', name: 'delete_product', methods: [Request::METHOD_DELETE])]
    public function deleteAction(int $id)
    {
        $product = $this->productRepository->find($id);
        
        if (!$product) {
            return $this->json('Product Not Found' . $id, 404);
        }

        $this->productRepository->delete($product);

        return $this->json('deleted!');
        
    }
}