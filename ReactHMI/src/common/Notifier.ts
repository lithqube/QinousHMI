interface Observer<T> {
    (payload: T): void
}

/**
 * A notifier for a specific type of payload.
 */
export default class Notifier<T> {
    protected observers: Set<Observer<T>> = new Set();

    subscribe(observer: Observer<T>) {
        this.observers.add(observer);
    }

    unsubscribe(observer: Observer<T>) {
        this.observers.delete(observer);
    }

    unsubscribeAll() {
        this.observers.clear();
    }

    notify(payload: T) {
        this.observers.forEach(observer => observer(payload));
    }
}