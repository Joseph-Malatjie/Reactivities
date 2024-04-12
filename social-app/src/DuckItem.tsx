import { Duck } from "./demo";
import { Button } from 'semantic-ui-react'

interface Props {
    duck: Duck;
}

export default function DuckItem({duck}: Props){
    return (
        <div key={duck.name}>
            <span>{duck.name}</span>
            <Button positive onClick={() => duck.makeSound(duck.name + ' with ' + duck.numLegs + ' legs Quack')}>Make sound</Button>
        </div>
    )
}
