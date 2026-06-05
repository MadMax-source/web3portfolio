'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Globe,
  Calendar,
  User,
  Layers,
  Star,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

import { Project } from '@/context/project-context';
import { useReviews } from '@/context/review-context';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Review Modal Component
function ReviewModal({
  isOpen,
  onClose,
  projectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}) {
  const { addReview } = useReviews();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    review: '',
    rating: 5,
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setNotification({ type: 'error', message: 'Please upload an image file' });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ type: 'error', message: 'Image must be less than 5MB' });
        return;
      }
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setNotification(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);

    try {
      if (!formData.name.trim() || !formData.position.trim() || !formData.review.trim()) {
        setNotification({ type: 'error', message: 'Please fill in all fields' });
        setSubmitting(false);
        return;
      }

      await addReview({
        name: formData.name,
        position: formData.position,
        review: formData.review,
        rating: formData.rating,
        projectId,
        image: formData.image,
      });

      setNotification({ type: 'success', message: 'Review submitted successfully!' });
      setTimeout(() => {
        setFormData({ name: '', position: '', review: '', rating: 5, image: null });
        setImagePreview(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to add review:', error);
      setNotification({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to submit review. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={submitting}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Share Your Review</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Help others learn about this project
                </p>
              </div>

              {/* Notification */}
              <AnimatePresence>
                {notification && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-3 rounded-lg flex items-start gap-2 ${
                      notification.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/30 text-green-700'
                        : 'bg-red-500/10 border border-red-500/30 text-red-700'
                    }`}
                  >
                    {notification.type === 'success' ? (
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm">{notification.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Position / Title
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g., Product Manager"
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: num })}
                        disabled={submitting}
                        className="transition-transform hover:scale-110 disabled:opacity-50"
                      >
                        <Star
                          size={24}
                          className={
                            formData.rating >= num
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Share your experience with this project..."
                    required
                    disabled={submitting}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Profile Image (Optional)
                  </label>
                  <div className="space-y-2">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: null });
                            setImagePreview(null);
                          }}
                          disabled={submitting}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer disabled:opacity-50">
                        <Upload size={18} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={submitting}
                          className="hidden"
                        />
                      </label>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Max file size: 5MB (JPG, PNG, WebP)
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={submitting}
                    className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-4 h-4 border-2 border-transparent border-t-current rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const GithubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.4 2.7 3.1.3-.7.5-1.2.9-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.5.4.9 1.2.9 2.5v3.7c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );

  // FETCH SINGLE PROJECT
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        if (data.success) {
          setProject(data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          Project not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        projectId={id}
      />

      <div className="min-h-screen bg-background pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* HERO IMAGE */}
          {project.imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-[420px] rounded-2xl overflow-hidden border border-border mb-8 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          )}

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4 mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>

            {/* META */}
            <div className="flex flex-wrap gap-3 mt-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-xs rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium"
              >
                {project.category}
              </motion.span>

              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-xs rounded-lg bg-secondary"
              >
                {project.duration}
              </motion.span>

              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-xs rounded-lg bg-secondary"
              >
                Role: {project.role}
              </motion.span>
            </div>
          </motion.div>

          {/* LINKS & REVIEW BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-shadow"
              >
                <Globe size={18} />
                Live Demo
                <ArrowUpRight size={16} />
              </motion.a>
            )}

            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubUrl}
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-semibold"
              >
                <GithubIcon />
                Source Code
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setReviewModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-semibold"
            >
              <Star size={18} />
              Write Review
            </motion.button>
          </motion.div>

          {/* TECH STACK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Layers size={18} className="text-primary" />
              </div>
              Technologies
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 text-sm rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium cursor-default"
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* FEATURES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 mt-1.5 rounded-full bg-primary flex-shrink-0"
                  />
                  <p className="text-base text-foreground leading-relaxed">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CHALLENGES */}
          {project.challenges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>

              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border">
                <p className="text-base text-foreground leading-relaxed">{project.challenges}</p>
              </div>
            </motion.div>
          )}

          {/* FOOTER INFO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-muted-foreground border-t border-border pt-8 flex flex-col sm:flex-row gap-6"
          >
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Created: {project.createdAt ? new Date(project.createdAt).toDateString() : 'N/A'}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              Project ID: {id}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
