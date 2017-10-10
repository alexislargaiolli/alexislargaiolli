import { Slide } from './slide.model';
import { Project } from './project.model';
export const PROJECTS: Project[] = [
    {
        id: 2,
        name: 'MyFeelanceManager',
        link: 'https://my-manager-client.herokuapp.com/',
        subtitle: 'Développement et design',
        description: `Application web de gestion de projet pour freelancer.`,
        posterUrl: 'assets/projects/mfm/mfm.jpg',
        slides: [
            {
                posterUrl: 'assets/projects/mfm/mfm-1.jpg'
            },
            {
                posterUrl: 'assets/projects/mfm/mfm-2.jpg'
            },
            {
                posterUrl: 'assets/projects/mfm/mfm-3.jpg'
            },
            {
                posterUrl: 'assets/projects/mfm/mfm-3.jpg'
            }
        ],
        technos: [
            {
                name: 'Angular2',
                posterUrl: 'assets/technos/angularjs.jpg',
                link: 'https://angular.io/'
            },
            {
                name: 'NodeJs',
                posterUrl: 'assets/technos/nodejs.jpg',
                link: 'https://nodejs.org/fr/'
            },
            {
                name: 'Redux',
                posterUrl: 'assets/technos/redux.jpg',
                link: 'http://redux.js.org/'
            },
            {
                name: 'Heroku',
                posterUrl: 'assets/technos/heroku.jpg',
                link: 'https://www.heroku.com/'
            }
        ]
    },
    {
        id: 3,
        name: 'TooFrench',
        link: 'https://toofrench.net',
        subtitle: 'Développement',
        description: `Site web de mise en relation avec des professeurs de français langue étrangère (FLE).`,
        posterUrl: 'assets/projects/toofrench/toofrench.jpg',
        slides: [
            {
                posterUrl: 'assets/projects/toofrench/toofrench-1.jpg'
            },
            {
                posterUrl: 'assets/projects/toofrench/toofrench-2.jpg'
            },
            {
                posterUrl: 'assets/projects/toofrench/toofrench-3.jpg'
            }
        ],
        technos: [
            {
                name: 'AngularJS',
                posterUrl: 'assets/technos/angularjs.jpg',
                link: 'https://angularjs.org/'
            },
            {
                name: 'NodeJs',
                posterUrl: 'assets/technos/nodejs.jpg',
                link: 'https://nodejs.org/fr/'
            },
            {
                name: 'MongoDB',
                posterUrl: 'assets/technos/mongo.jpg',
                link: 'https://www.mongodb.com/fr'
            },
            {
                name: 'Heroku',
                posterUrl: 'assets/technos/heroku.jpg',
                link: 'https://www.heroku.com/'
            }
        ]
    },
    {
        id: 4,
        name: 'LesRégimes',
        link: 'http://lesregimes.net',
        subtitle: 'Développement',
        description: `Site communautaire sur la diététique et les régimes.`,
        posterUrl: 'assets/projects/regimesnet/regimesnet.jpg',
        slides: [
            {
                posterUrl: 'assets/projects/regimesnet/regimes-1.jpg'
            },
            {
                posterUrl: 'assets/projects/regimesnet/regimes-2.jpg'
            },
            {
                posterUrl: 'assets/projects/regimesnet/regimes-3.jpg'
            },
            {
                posterUrl: 'assets/projects/regimesnet/regimes-4.jpg'
            },
            {
                posterUrl: 'assets/projects/regimesnet/regimes-5.jpg'
            }
        ],
        technos: [
            {
                name: 'AngularJS',
                posterUrl: 'assets/technos/angularjs.jpg',
                link: 'https://angularjs.org/'
            },
            {
                name: 'NodeJs',
                posterUrl: 'assets/technos/nodejs.jpg',
                link: 'https://nodejs.org/fr/'
            },
            {
                name: 'MongoDB',
                posterUrl: 'assets/technos/mongo.jpg',
                link: 'https://www.mongodb.com/fr'
            },
            {
                name: 'Heroku',
                posterUrl: 'assets/technos/heroku.jpg',
                link: 'https://www.heroku.com/'
            }
        ]
    },
    {
        id: 1,
        name: 'WeAreLearning',
        link: 'https://www.wearelearning.com',
        subtitle: 'Gestion de projet et développement',
        description: `Plateforme de conception de diffusion de e-learning et serious game. Participation en tant que salarié chez WeAreLearning.`,
        posterUrl: 'assets/projects/wal/wal.jpg',
        slides: [
            {
                posterUrl: 'assets/projects/wal/wal-1.png'
            },
            {
                posterUrl: 'assets/projects/wal/wal-2.jpg'
            },
            {
                posterUrl: 'assets/projects/wal/wal-3.jpg'
            }
        ],
        technos: [
            {
                name: 'J2EE',
                posterUrl: 'assets/technos/j2ee.jpg',
                link: 'https://deltaspike.apache.org/'
            },
            {
                name: 'JBoss',
                posterUrl: 'assets/technos/jboss.jpg',
                link: 'http://wildfly.org/'
            },
            {
                name: 'MySQL',
                posterUrl: 'assets/technos/mysql.jpg',
                link: 'https://www.mysql.com/fr/'
            },
            {
                name: 'Hibernate',
                posterUrl: 'assets/technos/hibernate.jpg',
                link: 'http://hibernate.org/'
            }
        ]
    },
];
