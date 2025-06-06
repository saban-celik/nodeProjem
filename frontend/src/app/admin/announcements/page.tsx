//C:\webproje\celikoglu_baklava\frontend\src\app\admin\announcements\page.tsx
"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { createAnnouncement, deleteAnnouncement, fetchAnnouncements, updateAnnouncement } from "@/utils/api";
import { useEffect, useState } from "react";

interface AnnouncementItem {
  id?: number;
  title: string;
  content: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [form, setForm] = useState<AnnouncementItem>({ title: "", content: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect çalıştı, fetchAnnouncements çağrılacak");
    fetchAnnouncements()
      .then((data) => {
        console.log("fetchAnnouncements verisi alındı:", data);
        setAnnouncements(data);
      })
      .catch((err) => {
        console.error("fetchAnnouncements hatası:", err.message);
        setError(err.message);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log("handleChange, alan:", name, "değer:", value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAnnouncement = async () => {
    console.log("handleAddAnnouncement çağrıldı, form verisi:", form);
    if (!form.title || !form.content) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    setError(null);

    try {
      if (editingId !== null) {
        console.log("Duyuru güncelleniyor, id:", editingId);
        const updatedAnnouncement = await updateAnnouncement(editingId, form);
        console.log("Güncellenen duyuru:", updatedAnnouncement);
        setAnnouncements((prev) =>
          prev.map((item) => (item.id === editingId ? updatedAnnouncement : item))
        );
        setEditingId(null);
      } else {
        console.log("Yeni duyuru ekleniyor");
        const newAnnouncement = await createAnnouncement(form);
        console.log("Eklenen duyuru:", newAnnouncement);
        setAnnouncements((prev) => [...prev, newAnnouncement]);
      }
      setForm({ title: "", content: "" });
    } catch (err: any) {
      console.error("handleAddAnnouncement hatası:", err.message);
      setError(err.message);
      alert(err.message);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    console.log("handleDeleteAnnouncement çağrıldı, id:", id);
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      setError(null);
      try {
        console.log("Duyuru siliniyor, id:", id);
        await deleteAnnouncement(id);
        console.log("Duyuru silindi, id:", id);
        setAnnouncements((prev) => prev.filter((item) => item.id !== id));
      } catch (err: any) {
        console.error("handleDeleteAnnouncement hatası:", err.message);
        setError(err.message);
        alert(err.message);
      }
    }
  };

  const handleEditAnnouncement = (item: AnnouncementItem) => {
    console.log("handleEditAnnouncement çağrıldı, seçilen duyuru:", item);
    setForm({ title: item.title, content: item.content });
    setEditingId(item.id ?? null);
  };

  return (
    <AdminLayout>
      <div className="container">
        <h2 className="mb-4 dashboard__title">
          {editingId ? "Duyuru Düzenle" : "Yeni Duyuru Ekle"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="product-form">
          <div className="form-group mb-3">
            <label htmlFor="title" className="form-label">Başlık</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Duyuru Başlığı"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="content" className="form-label">İçerik</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              placeholder="Duyuru İçeriği"
              value={form.content}
              onChange={handleChange}
              rows={6}
            />
          </div>

          <button onClick={handleAddAnnouncement} className="btn btn-success">
            {editingId ? "Güncelle" : "Ekle"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setForm({ title: "", content: "" });
                setEditingId(null);
              }}
              className="btn btn-secondary ms-2"
            >
              İptal
            </button>
          )}
        </div>

        <div className="row mt-5">
          {announcements.map((item, idx) => (
            <div key={item.id ?? idx} className="col-md-3 mb-4">
              <div className="product-card">
                <h5 className="mt-2">{item.title}</h5>
                <p>{item.content.substring(0, 100)}...</p>
                <div className="product-card__actions">
                  <button
                    onClick={() => handleEditAnnouncement(item)}
                    className="btn btn-primary btn-sm"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(item.id!)}
                    className="btn btn-danger btn-sm"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}