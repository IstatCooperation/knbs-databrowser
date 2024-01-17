import { Option } from "./option";

export class FilterDimension {
    public id : any;
    public label : any;
    public value : any;
    public options : Option [];

    constructor(id : any, label : any, value : any, options : Option []) {
        this.id = id;
        this.label = label;
        this.value = value;
        this.options = options;
    }
}