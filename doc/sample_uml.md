```mermaid
package "Client Tier" {
    [Web Browser / User Agent] as Browser
}

package "Presentation Layer (Flask / Jinja2)" {
    [Base Layout (base.html)] as BaseTemplate
    [Dashboard View (dashboard.html)] as DashView
    [Reservation View (reserve.html)] as ReserveView
    [Pickup & Feedback View (confirm_pickup.html)] as PickupView
}

package "Application Layer (Flask Backend)" {
    [Routing & Controllers (app.py)] as AppController
    [Stock Management Module] as StockMgr
    [Notification Engine] as NotifEngine
    [Safety & Expiration Monitor] as SafetyMonitor
}

package "Data Tier" {
    database "In-Memory Data Store / DB" {
        [Postings Record] as PostingsDB
        [Notification Queue] as NotifDB
        [Feedback & Complaints Log] as FeedbackDB
    }
}

Browser --> BaseTemplate : HTTP GET / POST Requests
BaseTemplate --> DashView : Extends
BaseTemplate --> ReserveView : Extends
BaseTemplate --> PickupView : Extends

DashView --> AppController : GET / (View Listings)
ReserveView --> AppController : POST /post/<id> (Reserve Spot)
PickupView --> AppController : POST /pickup/<id> (Deduct Servings & Submit Feedback)

AppController --> StockMgr : Validate & Update Quantities
AppController --> NotifEngine : Trigger Real-time Alerts
AppController --> SafetyMonitor : Enforce 2-Hour Expiration Rule

StockMgr --> PostingsDB : Read / Write Inventory
NotifEngine --> NotifDB : Fetch Active Alerts
AppController --> FeedbackDB : Record User Reviews & Complaints
SafetyMonitor --> PostingsDB : Expire Stale Postings
```
