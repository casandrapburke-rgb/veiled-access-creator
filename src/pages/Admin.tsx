import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { LogOut, Plus, Send, Copy, Trash2, Edit, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AccessKey {
  id: string;
  access_key: string;
  assigned_user_name: string;
  role: string;
  status: string;
  date_issued: string;
  last_login: string | null;
}

const generateKey = (length = 12) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Admin = () => {
  const navigate = useNavigate();
  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  // New key dialog
  const [newKeyOpen, setNewKeyOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newRole, setNewRole] = useState("layperson");

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editKey, setEditKey] = useState<AccessKey | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Message dialog
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgTarget, setMsgTarget] = useState<string>("broadcast");
  const [msgTitle, setMsgTitle] = useState("");
  const [msgBody, setMsgBody] = useState("");

  const checkAdmin = useCallback(() => {
    const isAdmin = sessionStorage.getItem("ie_admin_authenticated");
    if (isAdmin !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  const fetchKeys = useCallback(async () => {
    let query = supabase.from("access_keys").select("*").order("date_issued", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setKeys(data || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { checkAdmin(); }, [checkAdmin]);
  useEffect(() => { fetchKeys(); }, [fetchKeys]);

  const logAction = async (action: string, details: Record<string, unknown>) => {
    await supabase.from("admin_audit_log").insert([{
      admin_id: null,
      action,
      details: details as any,
    }]);
  };

  const handleAddKey = async () => {
    const key = generateKey();
    const { error } = await supabase.from("access_keys").insert({
      access_key: key,
      assigned_user_name: newUserName || "Unassigned",
      role: newRole,
      status: "active",
    });
    if (!error) {
      await logAction("add_key", { key, user_name: newUserName, role: newRole });
      toast({ title: "Key Created", description: key });
      setNewKeyOpen(false);
      setNewUserName("");
      setNewRole("layperson");
      fetchKeys();
    }
  };

  const handleEditKey = async () => {
    if (!editKey) return;
    const { error } = await supabase.from("access_keys").update({
      assigned_user_name: editUserName,
      role: editRole,
      status: editStatus,
    }).eq("id", editKey.id);
    if (!error) {
      await logAction("edit_key", { key: editKey.access_key, changes: { editUserName, editRole, editStatus } });
      toast({ title: "Key Updated" });
      setEditOpen(false);
      fetchKeys();
    }
  };

  const handleDeleteKey = async (key: AccessKey) => {
    if (!confirm(`Delete key ${key.access_key}?`)) return;
    await supabase.from("access_keys").delete().eq("id", key.id);
    await logAction("delete_key", { key: key.access_key });
    toast({ title: "Key Deleted" });
    fetchKeys();
  };

  const handleRevokeKey = async (key: AccessKey) => {
    await supabase.from("access_keys").update({ status: "revoked" }).eq("id", key.id);
    await logAction("revoke_key", { key: key.access_key });
    toast({ title: "Key Revoked" });
    fetchKeys();
  };

  const handleSendMessage = async () => {
    const { error } = await supabase.from("messages").insert({
      target_key: msgTarget === "broadcast" ? null : msgTarget,
      title: msgTitle,
      body: msgBody,
      sent_by: null,
    });
    if (!error) {
      await logAction("send_message", { target: msgTarget, title: msgTitle });
      toast({ title: "Message Sent" });
      setMsgOpen(false);
      setMsgTitle("");
      setMsgBody("");
      setMsgTarget("broadcast");
    }
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Copied", description: key });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ie_admin_authenticated");
    navigate("/admin-login");
  };

  const openEdit = (key: AccessKey) => {
    setEditKey(key);
    setEditUserName(key.assigned_user_name);
    setEditRole(key.role);
    setEditStatus(key.status);
    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/30 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-3">
          <img src="/images/sigil.png" alt="IE" className="w-7 h-7 opacity-60" />
          <span className="font-serif text-primary text-sm tracking-[0.15em] uppercase">Admin Panel</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-serif text-2xl sm:text-3xl gold-gradient-text font-bold mb-6">Key Management</h1>

        {/* Actions bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px] bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Keys</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={newKeyOpen} onOpenChange={setNewKeyOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Key</Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader><DialogTitle className="font-serif text-primary">Generate New Key</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <Input placeholder="Assigned User Name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="bg-secondary border-border" />
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="layperson">Layperson</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="hero" onClick={handleAddKey} className="w-full">Generate & Save</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={msgOpen} onOpenChange={setMsgOpen}>
            <DialogTrigger asChild>
              <Button variant="heroOutline" size="sm"><Send className="w-4 h-4 mr-1" /> Send Message</Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader><DialogTitle className="font-serif text-primary">Send Communication</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <Select value={msgTarget} onValueChange={setMsgTarget}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broadcast">Broadcast (All Active)</SelectItem>
                    {keys.filter(k => k.status === "active").map(k => (
                      <SelectItem key={k.id} value={k.access_key}>{k.assigned_user_name} ({k.access_key.slice(0, 6)}...)</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Title" value={msgTitle} onChange={(e) => setMsgTitle(e.target.value)} className="bg-secondary border-border" />
                <Textarea placeholder="Message body..." value={msgBody} onChange={(e) => setMsgBody(e.target.value)} className="bg-secondary border-border min-h-[100px]" />
                <Button variant="hero" onClick={handleSendMessage} className="w-full" disabled={!msgTitle || !msgBody}>Send</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm" onClick={fetchKeys}><RefreshCw className="w-4 h-4" /></Button>
        </div>

        {/* Keys Table */}
        {loading ? (
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        ) : (
          <div className="border border-border/30 rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-primary/70 font-serif">Access Key</TableHead>
                  <TableHead className="text-primary/70 font-serif">User</TableHead>
                  <TableHead className="text-primary/70 font-serif">Role</TableHead>
                  <TableHead className="text-primary/70 font-serif">Status</TableHead>
                  <TableHead className="text-primary/70 font-serif">Issued</TableHead>
                  <TableHead className="text-primary/70 font-serif">Last Login</TableHead>
                  <TableHead className="text-primary/70 font-serif text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.id} className="border-border/20 hover:bg-secondary/30">
                    <TableCell className="font-mono text-xs text-foreground/80">
                      <span className="flex items-center gap-1">
                        {key.access_key}
                        <button onClick={() => copyKey(key.access_key)} className="text-primary/40 hover:text-primary transition-colors">
                          <Copy className="w-3 h-3" />
                        </button>
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground/80 text-sm">{key.assigned_user_name}</TableCell>
                    <TableCell>
                      <Badge variant={key.role === "agent" ? "default" : "secondary"} className="text-xs capitalize">
                        {key.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.status === "active" ? "default" : "destructive"} className="text-xs capitalize">
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground/60 text-xs">
                      {new Date(key.date_issued).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-foreground/60 text-xs">
                      {key.last_login ? new Date(key.last_login).toLocaleString() : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(key)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {key.status === "active" && (
                          <button onClick={() => handleRevokeKey(key)} className="p-1.5 text-muted-foreground hover:text-primary/70 transition-colors">
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button onClick={() => handleDeleteKey(key)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-serif text-primary">Edit Key</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <Input placeholder="User Name" value={editUserName} onChange={(e) => setEditUserName(e.target.value)} className="bg-secondary border-border" />
            <Select value={editRole} onValueChange={setEditRole}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="layperson">Layperson</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={editStatus} onValueChange={setEditStatus}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="hero" onClick={handleEditKey} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
