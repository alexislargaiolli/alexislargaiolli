import { Techno } from './techno.model';
import { Slide } from './slide.model';
export class Project {
    id: number;
    name: string;
    link: string;
    subtitle: string;
    description: string;
    posterUrl: string;
    slides: Slide[];
    technos: Techno[];
}
