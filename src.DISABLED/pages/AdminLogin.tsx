import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import styles from './AdminLogin.module.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Vérifier si déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabase) {
      setError('Supabase non configuré');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setError('Email ou mot de passe incorrect');
        console.error('Erreur auth:', authError);
        return;
      }

      if (data.user) {
        console.log('✅ Connexion réussie:', data.user.email);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Erreur de connexion');
      console.error('Erreur login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <h1>FSVB Studio</h1>
          <p>Administration</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Email administrateur</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fsvbstudio.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className={styles.error}>
              ❌ {error}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;