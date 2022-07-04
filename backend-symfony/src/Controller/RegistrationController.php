<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $hasher
    ) {   
    }



    #[Route('/registration', name: 'app_registration')]
    public function index(Request $request)
    {
        $input = json_decode($request->getContent(), true);

        $user = new User();

        if (!isset($input['username'])) return $this->json('error', 400);

        $userId = str_split($input['username']);

        if (count($userId) != 5 || (int)$input['username'] == 0) return $this->json('error', 400);
        (int)$sum1 = (int)$userId[0]+(int)$userId[1]+(int)$userId[2];
        (int)$sum2 = $userId[3].$userId[4];
        if ($sum1 != $sum2) return $this->json('error', 400);


        $user->setUsername($input['username']);
        $plaintextPassword = $input['password'];

        $hashedPassword = $this->hasher->hashPassword($user, $plaintextPassword);

        $user->setPassword($hashedPassword);

        $this->userRepository->save($user);

        return $this->json([
            'success register' 
        ]);
    }
}
