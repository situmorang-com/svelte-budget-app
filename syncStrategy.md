```mermaid
graph TD
    A["App Start"] --> B{"Is User Online?"}
    B -- Yes --> C["Fetch Data from Server (SQLite)"]
    C --> D["Update IndexedDB"]
    D --> E["Update DOM"]
    B -- No --> F["Load Data from IndexedDB"]
    F --> E

    G["User Makes Changes"] --> H["Update DOM"]
    H --> I["Store Changes in IndexedDB"]
    I --> J{"Is User Online?"}
    J -- Yes --> K["Sync Changes to Server (SQLite)"]
    K --> L["Update IndexedDB & DOM"]
    J -- No --> M["Store Changes as Pending Syncs"]

    N["Network Transition: Offline -> Online"] --> O["Check for Pending Syncs"]
    O --> P["Attempt Sync with Server"]
    P --> Q{"Successful Sync?"}
    Q -- Yes --> R["Update IndexedDB & DOM"]
    Q -- No --> S["Keep Pending Syncs"]

    T["Conflict Detected"] --> U["Prompt User for Conflict Resolution"]
    U --> V["Resolve Conflict"]
    V --> R

```

```mermaid
graph TD
    A[User Interaction with UI/DOM]
    A --> B[IndexedDB - Offline Cache]
    B -->|Save Updates| B
    B --> C{Device Online?}
    C -->|No| B
    C -->|Yes| D[Sync Service]
    D --> E[SQLite Database]
    E --> F[Resolve Conflicts]
    F --> G[Sync with Other Devices]
    G --> B
    G --> H[Update DOM]
    
    %% Relationships for Other Devices Syncing
    E --> I[Fetch Changes]
    I --> J[Apply Changes Locally]
    J --> B
    J --> H
```

```mermaid
%%{init: { 'theme': 'base', 'themeVariables': { 'primaryColor': '#34a853', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#f7f7f7' } } }%%

stateDiagram-v2
    [*] --> OfflineFirstApp
    state OfflineFirstApp {
        direction LR
        DOM --> IndexedDB : "Save changes"
        IndexedDB --> SQLite : "Sync locally"
        SQLite --> SyncManager : "Prepare sync"
        SyncManager --> SyncStatus : "Monitor sync status"
    }
    OfflineFirstApp --> UserInteraction : "User interacts offline"
    UserInteraction --> DOM : "Update UI"

    OfflineFirstApp --> NetworkHandler : "Detect network status"
    state NetworkHandler {
        direction TB
        Offline --> SyncManager : "Queue operations"
        Online --> SyncManager : "Trigger sync"
    }
    NetworkHandler --> SyncManager
    SyncManager --> ServerSync : "Sync with central server"
    state ServerSync {
        direction TB
        CommitChanges --> ConflictResolution : "Handle conflicts"
        ConflictResolution --> ServerUpdate : "Update server"
    }
    ServerSync --> [*] : "Sync complete"
    ServerSync --> SyncStatus : "Update local status"

    note left of NetworkHandler : "Offline first approach"
    note right of ServerSync : "Conflict management strategies like manual merge or last write wins"
    note right of SyncManager : "Synchronize across IndexedDB and SQLite, manage retry attempts"
    note left of SyncStatus : "Track success or error status, notify user of sync progress"
    note right of UserInteraction : "Optimistic UI updates to enhance user experience"
    note left of OfflineFirstApp : "Local storage with IndexedDB and SQLite ensures offline capability"
    note right of ServerSync : "Handle data encryption for secure data transmission"
    note left of NetworkHandler : "Detect network availability and queue operations during offline state"
```


Best practices for creating an offline-first app:

- Use **local storage** (IndexedDB/SQLite) for offline data persistence.
- Implement a **sync manager** to track changes and synchronize data.
- Use **conflict resolution** strategies (e.g., manual merge, last write wins).
- **Monitor network status** to manage online/offline operations.
- Provide **user feedback** on sync status and network state.
- Ensure **graceful degradation** for offline user experience.
- Implement **retry mechanisms** for failed sync attempts.
- Use **service workers** for caching resources.
- Perform **optimistic UI updates** to improve user experience.
- Handle **data encryption** for secure storage and transmission.
- Regularly **test offline scenarios** for resilience.
  