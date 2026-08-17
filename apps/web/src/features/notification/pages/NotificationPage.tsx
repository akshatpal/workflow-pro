import NotificationList from "../components/NotificationList";

export default function NotificationPage() {
  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <p className="mt-2 text-slate-500">
          Stay updated with activity across your workspace.
        </p>
      </div>

      <NotificationList />
    </div>
  );
}