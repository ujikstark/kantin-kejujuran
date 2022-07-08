<?php

namespace App\Controller;



use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
        
        $data = [];
 
        foreach ($products as $product) {
           $data[] = [
               'id' => $product->getId(),
               'name' => $product->getName(),
               'description' => $product->getDescription(),
               'image' => $product->getImage(),
               'price' => $product->getPrice(),
               'user_id' => $product->getUser()->getUserIdentifier()
           ];
        }
 
 
        return $this->json($data);

    }

    #[Route('/api/products', name: 'create_product', methods: [Request::METHOD_POST])]
    public function createAction(Request $request)
    {
        $user = $this->getUser();

        $input = json_decode($request->getContent(), true);

        $product = new Product();
        $product->setName($input['name']);
        $product->setDescription($input['description']);
        $product->setImage($input['image']);
        $product->setPrice((int)$input['price']);
        $product->setUser($user);
    
        $this->productRepository->save($product);

        $data = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'user_id' => $product->getUser()->getUserIdentifier(),
        ];

        return $this->json($data);
        
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