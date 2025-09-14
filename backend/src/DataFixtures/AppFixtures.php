<?php

namespace App\DataFixtures;

use App\Entity\Exam;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class AppFixtures extends Fixture
{
    public function __construct(private readonly ParameterBagInterface $parameterBag)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $this->loadAdminUser($manager);
        $this->loadExams($manager);
    }

    public function loadAdminUser(ObjectManager $manager): void
    {
        $user = new User();
        $user->setName('Admin')
            ->setEmail($this->parameterBag->get('admin_email') || 'admin@example.com')
            ->setRoles(['ROLE_ADMIN'])
            ->setPassword($this->parameterBag->get('admin_password') || 'admin');

        $manager->persist($user);

        $manager->flush();
    }

    private function loadExams(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $statuses = ['confirmed', 'to_organize', 'cancelled', 'searching'];

        for ($i = 0; $i < 4; $i++) {
            $exam = new Exam();
            $exam->setStudentName($faker->name());
            $exam->setLocation($faker->city());
            $exam->setDate($faker->dateTimeBetween('-2 days', '+1 month'));
            $exam->setTime($faker->numberBetween(0,23));
            $exam->setStatus($statuses[$i]);

            $manager->persist($exam);
        }

        $manager->flush();
    }
}
