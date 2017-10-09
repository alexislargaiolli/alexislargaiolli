import { Slide } from './slide.model';
import { Project } from './project.model';
export const PROJECTS: Project[] = [
    {
        id: 1,
        name: 'WeAreLearning',
        link: 'https://www.wearelearning.com',
        subtitle: 'Gestion de projet et développement',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.`,
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
                posterUrl: 'assets/technos/j2ee.jpg'
            },
            {
                name: 'Hibernate',
                posterUrl: 'assets/technos/hibernate.jpg'
            },
            {
                name: 'MySQL',
                posterUrl: 'assets/technos/mysql.jpg'
            }
        ]
    },
    {
        id: 2,
        name: 'MyFeelanceManager',
        link: 'https://my-manager-client.herokuapp.com/',
        subtitle: 'Développement et design',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.`,
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
                posterUrl: 'assets/technos/angularjs.jpg'
            },
            {
                name: 'NodeJs',
                posterUrl: 'assets/technos/nodejs.jpg'
            },
            {
                name: 'Redux',
                posterUrl: 'assets/technos/redux.jpg'
            }
        ]
    },
    {
        id: 3,
        name: 'TooFrench',
        link: 'https://toofrench.net',
        subtitle: 'Développement',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.`,
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
                posterUrl: 'assets/technos/angularjs.jpg'
            },
            {
                name: 'NodeJs',
                posterUrl: 'assets/technos/nodejs.jpg'
            },
            {
                name: 'MongoDB',
                posterUrl: 'assets/technos/mongo.jpg'
            }
        ]
    },
    {
        id: 4,
        name: 'LesRégimes',
        link: 'http://lesregimes.net',
        subtitle: 'Développement',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.`,
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
                posterUrl: 'assets/technos/angularjs.jpg'
            },
            {
                name: 'NodeJs',
                posterUrl: 'assets/technos/nodejs.jpg'
            },
            {
                name: 'MongoDB',
                posterUrl: 'assets/technos/mongo.jpg'
            }
        ]
    }
];
