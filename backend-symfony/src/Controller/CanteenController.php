<?php

namespace App\Controller;

use App\Repository\CanteenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CanteenController extends AbstractController
{

    public function __construct(
        private CanteenRepository $canteenRepository,
    ) {   
    }

    #[Route('/api/canteen', name: 'canteen_list', methods: [Request::METHOD_GET])]
    public function indexAction()
    {
        $canteen = $this->canteenRepository->find(1);
 
        return $this->json(['balance' => $canteen->getBalance()]);

    }

    #[Route('/api/canteen', name: 'canteen_edit', methods: [Request::METHOD_PUT])]
    public function editAction(Request $request)
    {
        $canteen = $this->canteenRepository->find(1);

        if (!$canteen) {
            return $this->json('Canteen Not Found' . '1', 404);
        }

        $input = json_decode($request->getContent(), true);
        $canteen->setBalance($input['balance']);
        
        $this->canteenRepository->edit($canteen);

 
        return $this->json(['balance' => $canteen->getBalance()]);

    }
}
