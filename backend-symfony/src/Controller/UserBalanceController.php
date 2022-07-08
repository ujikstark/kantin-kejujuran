<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserBalanceController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
    ) {   
    }

    #[Route('/api/user/{username}/balance', name: 'user_balance', methods: [Request::METHOD_PUT])]
    public function editAction(Request $request, $username)
    {
        $user = $this->userRepository->findOneBy(['username' => $username]);

        if (!$user) {
            return $this->json('User Not Found' . '1', 404);
        }

        $input = json_decode($request->getContent(), true);
        $user->setBalance($input['balance']);
        
        $this->userRepository->edit($user);

 
        return $this->json(['balance' => $user->getBalance()]);

    }
}
