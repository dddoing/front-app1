class DetailKeeper {
    name = 'sample'
    age = 22

    call() {
        return 'name : ' + this.name + 'age: ' + this.age
    }

    call2() {
        return 'Restaurant'
    }

}
DetailKeeper.instance = new DetailKeeper();
export default DetailKeeper;